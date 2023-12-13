<?php

namespace App\Entities;

use App\Contracts\GameSheet;

class LiveGameSheet implements GameSheet {
    public function getStartRowIndex(): int {
        return 1;
    }

    public function getGameNameIndex(): int {
        return 0;
    }

    public function getGameCodeIndex(): int {
        return 2;
    }

    public function getGameTypeIndex(): int {
        return 1;
    }

    public function getGameAliasIndex(): int {
        return 3;
    }
}
