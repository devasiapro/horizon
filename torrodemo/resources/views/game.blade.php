<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Torrodemo</title>
        <link rel="icon" type="image/x-icon" href="torro-favico.png">
    </head>
    <body>
    <body style="margin:0px;padding:0px;overflow:hidden">
        <input type="hidden" id="token" value="{{ $token }}" />
        <iframe src="{{ $game_url }}" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
        @vite('resources/js/play.js')
    </body>
</html>
