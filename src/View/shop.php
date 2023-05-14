<?php
// Create or increment the navigation page number
// get the page number and store it in a global session variable
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$page = ($page < 1) ? 1 : $page;
$_SESSION['page'] = $page;

?>

<main>
    <div class="container">

        <div class="page">
            <a href="shop.php?page=<?php echo $page + 1 ?>">
                <button class="btn next_button button-59">
                    Next Page >>
                </button>
            </a>
            <a href="shop.php?page=<?php echo $page - 1 ?>">
                <button class="btn prev_button button-59">
                    << Previous Page </button>
            </a>

        </div>
        <div class="filter">
            <form id="selectCategory">
                <div id="categoryDiv">
                    <h4>Per category</h4>

                </div>
            </form>
            <form id="selectOrigin">
                <div id="originDiv">
                    <h4>Per origin</h4>
                </div>
            </form>
        </div>
        <div class="shop" id="shop">
            <!-- Display products whith api fetch -->
        </div>

    </div>

    <div class="page">
        <button class="btn next_button button-59"><a href="shop.php?page=<?php echo $page + 1 ?>">Next Page >></a></button>
        <button class="btn prev_button button-59"><a href="shop.php?page=<?php echo $page - 1 ?>"><< Previous Page</a></button>

    </div>

</main>
<!-- <script type="text/javascript" src="public/js/filter.js"></script>
<script type="text/javascript" src="public/js/shop.js"></script> -->