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
            <div>
                <button class="btn prev_button button-59"> << Previous Page </button>
            </div>
            <div>
                <button class="btn next_button button-59"> Next Page >> </button>
            </div>
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
        <div class="shop" id="shop_display">
            <!-- Display products whith api fetch -->
        </div>

        <div class="page">
            <div>
                <button class="btn prev_button button-59"> << Previous Page </button>
            </div>
            <div>
                <button class="btn next_button button-59"> Next Page >> </button>
            </div>
        </div>

    </div>
</main>