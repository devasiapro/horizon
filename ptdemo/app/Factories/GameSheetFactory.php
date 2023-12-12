<?php

namespace App\Factories;

use App\Contracts\GameSheet;
use App\Entities\CasinoGameSheet;
use App\Entities\LiveGameSheet;
use App\Entities\QuickspinGameSheet;

class GameSheetFactory {
    public function getGame($gameCategory): GameSheet {
        if ($gameCategory === 'Casino') {
            return new CasinoGameSheet();
        }

        if ($gameCategory === 'Live') {
            return new LiveGameSheet();
        }

        if ($gameCategory === 'Quickspin') {
            return new QuickspinGameSheet();
        }

        throw new \Exception("Category not found.");
    }
}
