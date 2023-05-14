<?php

namespace App\Controller;

require_once("./ProductController.php");

$productController = new ProductController();

if(isset($_POST["addRate"])){
    $productController->addRate($_POST["rating"], $_SESSION["user"]["id"], $_POST["id_pro"]);
}

if(isset($_GET["fetchRate"])){
    $productController->fetchRate($_GET["fetchRate"]);
}

if(isset($_GET["mostLiked"])){
    $productController->getMostLiked();
}

if(isset($_GET["fetchCategory"])){
    $productController->getCategories();
}

if(isset($_GET["fetchOrigin"])){
    $productController->getOrigins();
}

// if (isset($_POST['filterCategory']) && isset($_POST['filterOrigin'])) {
//     $productController->displayFiltered($_POST['filterCategory'], $_POST['filterOrigin'], $_POST['page']);
// }

?>