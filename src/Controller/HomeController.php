<?php

namespace App\Controller;

class HomeController
{
    function getHome() {
        require_once("src/View/home.php");
    }

    function getShop() {
        require_once("src/View/shop.php");
    }

    function getCart() {
        require_once("src/View/cart.php");
    }

    function getAbout() {
        require_once("src/View/about.php");
    }

    function getContact() {
        require_once("src/View/contact.php");
    }
}