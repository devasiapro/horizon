<?php

namespace App\Contracts;

interface GameSheet {
    public function getStartRowIndex(): int;
    public function getGameNameIndex(): int;
    public function getGameCodeIndex(): int;
    public function getGameTypeIndex(): int;
    public function getGameAliasIndex(): int | null;
}
