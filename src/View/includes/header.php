<?php
if (isset($_SESSION["user"])) {
    if (isset($_POST["deco"])) {
        session_destroy();
        header("Location: index.php");
        exit;
    }
}
?>
<nav>
    <div class="top_part">
        <div class="logo_part">
            <img src="./public/img/logo1.png">
        </div>
            <div id="menu">
                <ul>
                    <li>
                        <a href="#"><ion-icon name="person-circle-outline"></ion-icon></a>
                        <ul>
                            <?php if (isset($_SESSION["user"])) : ?>
                                <?php if (!isset($_SESSION['user']['role']) || $_SESSION['user']['role'] !== 'admin') : ?>
                                    <li><button id="profile">Profil</button></li>
                                <?php else : ?>
                                    <li><button id="admin.php">Admin</button></li>
                                <?php endif ?>
                                <form method="post">
                                    <li><button name="deco" id="decoBtn">Deconnexion</button></li>
                                </form>
                            <?php else : ?>
                                <li><button id="logDisplayBtn">Login</button></li>
                                <li><button id="regDisplayBtn">Register</button></li>
                            <?php endif ?>
                        </ul>
                    </li>
                </ul>

            </div>
        
    </div>

    <div class="bottom_part">
        <!-- <a href="home">Home</a>
        <a href="shop">Shop</a> -->
        <button id="home">Home</button>
        <button id="shop">Shop</button>
        <?php if (isset($_SESSION["user"])) : ?>
            <button id="cart">Cart</button>
        <?php endif ?>
        <!-- <a href="about">About</a> -->
        <button id="about">About</button>
        <button id="contact">Contact</button>
        <div id="search">

            <form action="./../src/controllers/searchProduct.js" method="get" id="searchForm">
                <input type="search" name="search" placeholder="Search">
            </form>
            <div id="displayResult"></div>
        </div>
    </div>
    


</nav>
<div class="navbar">
    <div class="container nav-container">
        <input class="checkbox" type="checkbox" name="" id="" />
        <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
        </div>
        <div class="menu-items">
            <li><button id="home">Home</button></li>
            <li><button id="about">About</button></li>
            <li><button id="shop">Shop</button></li>
            <li><button id="cart">Cart</button></li>
            <li><button id="contact">Contact</button></li>
        </div>
    </div>
</div>

