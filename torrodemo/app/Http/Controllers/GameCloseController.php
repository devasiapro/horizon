<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GameCloseController extends Controller
{
    public function __construct()
    {
    }

    public function __invoke(Request $request)
    {
        Log::info($request->get('request_token'));
        $requestToken = $request->get('request_token');
        $hash = md5($requestToken .
            config('torro.secret_key')
        );

        $payload = [
            'request_token' => $requestToken,
            'hash' => $hash,
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Content-Length' =>  strlen(json_encode($payload)),
            'X-Api-Key' => config('torro.api_key'),
        ])
        ->withOptions(['verify' => false])
        ->post(config('torro.api_url') . '/api/gameClosed', $payload);

        if ($response->successful()) {
            return response()->json([
                'data' => json_decode($response->body()),
                'status' => $response->status(),
            ]);
        } else {
            // TODO: Torrospin API fail action
            return response()->json([
                'message' => $response->body(),
                'status' => $response->status(),
            ], $response->status());
        }
    }
}
