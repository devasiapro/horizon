<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use App\Models\Player;
use App\Models\Game;

class WalletController extends Controller
{
    private Player $player;
    private Game $game;

    public function __construct(Player $player, Game $game)
    {
        $this->player = $player;
        $this->game = $game;
    }

    private function stringifyPayload($payload)
    {
        $concatString = '';
        foreach ($payload as $key => $value) {
            if ($key === 'hash') {
                continue;
            }
            if (gettype($value) === 'array' ||
                gettype($value) === 'object' ||
                gettype($value) === 'resource' ||
                gettype($value) === 'NULL' ||
                gettype($value) === 'unkown type'
            ) {
                continue;
            }
            $concatString .= $value;
        }
        return $concatString;
    }

    public function __invoke(Request $request)
    {
        Log::info('Torrospin callback action: ' . $request->get('action'));
        switch ($request->get('action')) {
            case 'request_balance':
                $player = $this
                    ->player
                    ->where('casino_user_id', $request->get('user_id'))
                    ->firstOrFail();
                
                $gameRoundClose = $request->has('game_round_close') ? 
                    $request->get('game_round_close') : 
                    '';

                $stringified = $this->stringifyPayload($request->all());
                $hash = md5($stringified . config('torro.secret_key'));

                $data = request()->getContent();

                if ($hash !== $request->get('hash')) {
                    Log::error('Torrospin callback: Invalid hash. ' . json_encode($request->all()));
                    return response()->json([
                        'message' => 'Invalid hash',
                    ], 401);
                }

                $hash = md5(
                    true .
                    $player->balance .
                    $player->casino_user_id .
                    $request->get('token') .
                    config('torro.secret_key')
                );

                return response()->json([
                    'success' => true,
                    'balance' => $player->balance,
                    'user_id' => $player->casino_user_id,
                    'token' => $request->get('token'),
                    'hash' => $hash,
                ]);
                break;
            case 'update_balance':
                $player = $this
                    ->player
                    ->where('casino_user_id', $request->get('user_id'))
                    ->firstOrFail();

                $game = $this
                    ->game
                    ->where('launch_code', '=', $request->get('game_name'))
                    ->firstOrFail();

                $stringified = $this->stringifyPayload($request->all());
                $hash = md5($stringified . config('torro.secret_key'));
                Log::info($stringified . config('torro.secret_key'));
                $data = request()->getContent();

                if ($hash !== $request->get('hash')) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid hash',
                        'reason' => 'Invalid hash',
                    ], 401);
                }

                $player->balance = $player->balance +
                    ($request->get('win') - $request->get('bet'));
                $player->save();

                $hash = md5(
                    true .
                        $player->balance .
                        $request->get('token') . config('torro.secret_key')
                );

                return response()->json([
                    'success' =>  true,
                    'balance' => $player->balance,
                    'token' => $request->get('token'),
                    'hash' => $hash,
                    'reason' => '',
                ], 200);
                break;
            case 'refund_balance':
                $player = $this
                    ->player
                    ->where('casino_user_id', $request->get('user_id'))
                    ->firstOrFail();

                $stringified = $this->stringifyPayload($request->all());
                $hash = md5($stringified . config('torro.secret_key'));
                Log::info('This is the hash: ' . $hash);

                if ($hash !== $request->get('hash')) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid hash',
                        'reason' => 'Invalid hash',
                    ], 401);
                }

                $player->balance = $player->balance + $request->get('refund');
                $player->save();

                $hash = md5(
                    true .
                        $player->balance .
                        $request->get('token') .
                        config('torro.secret_key')
                );

                return response()->json([
                    'success' =>  true,
                    'balance' => $player->balance,
                    'token' => $request->get('token'),
                    'hash' => $hash,
                ], 200);
                break;
            default:
                return response()->json([
                    'message' => 'Invalid action.',
                ], 422);
        }
    }
}
