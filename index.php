<?php

require_once __DIR__ . '/vendor/autoload.php';

session_start();

use App\Controller\ProductController;

$router = new AltoRouter();

$router->setBasePath('/boutique-en-ligne');

$router->map('GET', '/', function() {
    require_once('src/View/home.php');
});

$router->map('GET', '/products/mostliked', function() {
    $productController = new ProductController();
    $productController->getMostLiked();
});

$router->map('GET', '/search/[a:search]', function($search) {
    $productController = new ProductController();
    $productController->getSearchProducts($search);
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