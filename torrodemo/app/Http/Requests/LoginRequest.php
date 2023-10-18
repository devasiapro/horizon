<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorized(): bool
    {
        return false;
    }

    public function rules(): array
    {
        return [
            'username' => 'required',
        ];
    }
}
