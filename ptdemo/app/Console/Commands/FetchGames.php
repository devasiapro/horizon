<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use App\Contracts\GameSheet;
use App\Factories\GameSheetFactory;
use App\Models\Game;

class FetchGames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-games 
                            {file} 
                            {--sheet=: Name of the sheet.}
                            {--category=: Casino, Live, Quickspin}
                            {--is-live=: }
                            {--is-progressive=: }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and populate games to the database from the Google Sheets.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $file = $this->argument('file');

        if ($file === 'all') {
            $this->runAll();
            return;
        }

        $sheet = $this->option('sheet');
        $category = $this->option('category');

        $reader = new Xlsx();
        $reader->setLoadSheetsOnly([$sheet]);
        $spreadsheet = $reader->load($file);
        $data = $spreadsheet->getActiveSheet()->toArray();

        $factory = new GameSheetFactory();
        $gameSheet = $factory->getGame($category);
        foreach ($data as $index => $row) {
            if ($gameSheet->getStartRowIndex() > $index) {
                continue;
            }
               
            if (!$row[$gameSheet->getGameNameIndex()]) {
                continue;
            }

            if (!$row[$gameSheet->getGameCodeIndex()]) {
                continue;
            }

            if (!$row[$gameSheet->getGameTypeIndex()]) {
                continue;
            }
            $aliasIndex = $gameSheet->getGameAliasIndex();
            $game = new Game();
            $game->name = $row[$gameSheet->getGameNameIndex()];
            $game->code = $row[$gameSheet->getGameCodeIndex()];
            $game->game_type = $row[$gameSheet->getGameTypeIndex()];
            $game->category = $category;
            $game->alias = $aliasIndex ? $row[$aliasIndex] : null;
            $game->is_live = $this->option('is-live');
            $game->is_progressive = $this->option('is-progressive');
            $game->save();
        }
    }

    private function runAll(): void {
        $this->call('app:fetch-games', [
            'file' => "database/raw_files/Casino Games.xlsx",
            '--is-live' => false,
            '--is-progressive' => false,
            '--sheet' => "Non Jackpot SlotsTable Games",
            '--category' => 'Casino',
        ]);    
        $this->call('app:fetch-games', [
            'file' => "database/raw_files/Casino Games.xlsx",
            '--is-live' => false,
            '--is-progressive' => true,
            '--sheet' => "Progressive SlotsTable Games",
            '--category' => 'Casino',
        ]);    
        $this->call('app:fetch-games', [
            'file' => "database/raw_files/Live Games.xlsx",
            '--is-live' => true,
            '--is-progressive' => false,
            '--sheet' => "Non-Progressive",
            '--category' => 'Live',
        ]);
        $this->call('app:fetch-games', [
            'file' => "database/raw_files/Live Games.xlsx",
            '--is-live' => true,
            '--is-progressive' => true,
            '--sheet' => "Progressive",
            '--category' => 'Live',
        ]);
    }
}
