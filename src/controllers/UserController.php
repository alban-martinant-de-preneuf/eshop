<?php

namespace src\controllers;

use src\Classes\User;

require_once("../Classes/User.php");

class UserController

{
    public $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function register($firstname, $lastname, $email, $password, $passwordConfirm)
    {

        if (empty($firstname)) {
            echo "Firstname is empty";
        } elseif (empty($lastname)) {
            echo "Lastname is empty";
        } elseif (empty($email)) {
            echo "Email is empty";
        } elseif ($password !== $passwordConfirm) {
            echo "password and confirmation password do not match";
        } else {
            $this->user->create($firstname, $lastname, $email, $password);
        }
    }

    public function login($email, $password)
    {
        if (empty($email)) {
            echo "Email is empty";
        } elseif (empty($password)) {
            echo "Password is empty";
        } else {
            $this->user->select($email, $password);
        }
    }



    public function changeProfil($id, $firstname, $lastname, $email)
    {

        $this->user->updateProfil(
            [
                "id_user" => $id,
                "firstname" => $firstname,
                "lastname" => $lastname,
                "email" => $email
            ]
        );
    }

    public function changeAddress($id, $address, $zip, $phone)
    {
        $this->user->updateAddress(
            [
                "id_user" => $id,
                "address" => $address,
                "postal_code" => $zip,
                "phone" => $phone
            ]
        );
    }

    public function changePassword($id, $password, $newPassword, $newPasswordConfirm)
    {
        $profil = $this->user->getData($id);

        if (password_verify($password, $profil["password"])) {

            if ($newPassword == $newPasswordConfirm) {

                $this->user->updatePassword($id, $newPassword);
            } else {
                echo "New password and new password confirm not match";
            }
        } else {
            echo "Invalid password";
        }
    }

    public function getUserData(){
        $this->user->getAllUserData();
    }

   
}
