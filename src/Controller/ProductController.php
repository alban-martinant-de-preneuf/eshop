<?php

namespace App\Controller;

use src\Classes\Product;

require_once($_SERVER['DOCUMENT_ROOT'] . '/boutique-en-ligne/src/Classes/Product.php');

class ProductController
{

    public $product;

    public function __construct()
    {
        $this->product = new Product();
    }

    public function addRate($value_rat, $id_user, $id_pro)
    {

        if ($id_rate = $this->product->isRated($id_user, $id_pro)) {

            $this->product->updateRate($id_rate, $value_rat, $id_user, $id_pro);
        } else {
            if ($value_rat >= 1 && $value_rat <= 5) {
                $this->product->insertRate($value_rat, $id_user, $id_pro);
            }
        }
    }

    public function fetchRate($id_pro)
    {
        $this->product->selectRate($id_pro);
    }

    public function getMostLiked()
    {
        return $this->product->selectMostLiked();
    }

    public function getCategories()
    {
        return $this->product->selectAllCategory();
    }

    public function getOrigins()
    {
        return $this->product->selectAllOrigin();
    }

    public function displayCategory($category)
    {
        return $this->product->selectOneCategory($category);
    }

    public function displayFilter($categories, $origins, $page)
    {
        $offset = ($page - 1) * 8;
        $this->product->displayFilter(explode(",", $categories), explode(",", $origins), $offset);
    }

    public function getSearchProducts($search) {
        echo json_encode($this->product->getSearchProduct($search));
    }
}
