<?php

require_once __DIR__ . '/vendor/autoload.php';

session_start();

use App\Controller\HomeController;
use App\Controller\ProductController;

$router = new AltoRouter();

$router->setBasePath('/boutique-en-ligne');

$router->map('GET', '/', function () {
    require_once('src/View/home.php');
});

$router->map('GET', '/products/mostliked', function () {
    $productController = new ProductController();
    $productController->getMostLiked();
});

$router->map('GET', '/products/categories', function () {
    $productController = new ProductController();
    $productController->getCategories();
});

$router->map('GET', '/products/origins', function () {
    $productController = new ProductController();
    $productController->getOrigins();
});

$router->map('POST', '/products/filter', function () {
    if (
        isset($_POST['filterCategory']) &&
        isset($_POST['filterOrigin']) &&
        isset($_POST['page'])
    ) {
        $productController = new ProductController();
        $productController->displayFiltered(
            $_POST['filterCategory'],
            $_POST['filterOrigin'],
            $_POST['page']
        );
    }
});

$router->map('GET', '/search/[a:search]', function ($search) {
    $productController = new ProductController();
    $productController->getSearchProducts($search);
});

$router->map('GET', '/profile', function () {
    echo "ok";
});

$router->map('GET', '/home', function () {
    $homeController = new HomeController();
    $homeController->getHome();
});

$router->map('GET', '/shop', function () {
    $homeController = new HomeController();
    $homeController->getShop();
});

$router->map('GET', '/cart', function () {
    $homeController = new HomeController();
    $homeController->getCart();
});

$router->map('GET', '/about', function () {
    $homeController = new HomeController();
    $homeController->getAbout();
});

$router->map('GET', '/contact', function () {
    $homeController = new HomeController();
    $homeController->getContact();
});

// match current request url
$match = $router->match();

// call closure or throw 404 status
if (is_array($match) && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    // no route was matched
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
}
