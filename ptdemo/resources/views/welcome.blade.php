<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <title>Horizon88</title>
    <script src="https://login.flyingdragon88.com/jswrapper/flyingdragon88/integration.js"></script>
    @vite([
      'resources/sass/app.scss', 
      'resources/js/app.js', 
    ])
    @vite([
      'resources/js/main.jsx', 
    ])
</head>
<body class="pb-5">
  <div id="root"></div>
</body>
</html>
