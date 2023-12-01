<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <title>Horizon88</title>
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body class="pb-5">
  <nav class="py-4 navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img 
          src="/images/horizon88-logo.svg" 
          width="100%"
          height="45px"
          class="d-block w-100 align-top" 
          alt=""
        >
      </a>
      <form class="d-flex">
        <button class="btn btn-lg fst-italic">LOG IN</button>
      </form>
    </div>
  </nav>
  <div  class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/images/banner-01.png" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="/images/banner-02.png" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="/images/banner-03.png" class="d-block w-100" alt="...">
      </div>
    </div>
  </div>  

  <div class="container-games pt-4 pb-4 mb-5">

    <div class="my-4 pt-4 position-relative d-flex flex-row marquee-container">
      <div class="marquee">
        <span>
          * THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
        <span>
          * THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
        <span>
          * THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
        <span>
          * THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
      </div>
      <div class="marquee marquee2">
        <span>
          THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
        <span>
          THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
        <span>
          THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
        <span>
          THIS  IS A DEMO WEBSITE * FOR DEMO PURPOSES ONLY * 
        </span>
      </div>
    </div>

    <div class="mx-2 py-4 d-flex flex-row filter-games">
      <div class="d-flex flex-row filter-elements">
        <div>&nbsp;</div> 
        <div>&nbsp;</div> 
        <div>&nbsp;</div> 
        <div>&nbsp;</div> 
      </div>
      <div class="search-games">
        &nbsp;
      </div>
    </div>

  </div>

</body>
</html>
