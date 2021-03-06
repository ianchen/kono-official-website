<?php

require_once 'class.phpmailer.php';

final class Mailer extends PHPMailer {

    static private $mUsername = "info@thekono.com";
    static private $mPassword = "thekono1";
    static private $mFrom = "info@thekono.com";
    static private $mFromName = "kono Digital Inc.";

    /**
     *  透過 GMail 送認證信給user
     *  @Arguments:
     *      - $addr (string): user email address
     *      - $content_arr (array): including user activated code, user email
     *                              and password.
     *
     *  @Returns:
     *      TURE on suceess, or FALSE on faliure.
     */
    public function GmailSend ( $subject, $email, $content ) 
    {
        $this->IsSMTP();        //設定使用SMTP方式寄信
        $this->SMTPAuth = true; //設定SMTP需要驗證
        $this->SMTPSecure = "ssl"; // Gmail的SMTP主機需要使用SSL連線
        $this->Host = "smtp.gmail.com"; //Gamil的SMTP主機
        $this->Port = 465;  //Gamil的SMTP主機的埠號(Gmail為465)。
        $this->CharSet = "utf-8"; //郵件編碼
        $this->Username = self::$mUsername; //寄信Gamil帳號
        $this->Password = self::$mPassword; //寄信Gmail密碼
        $this->From = self::$mFrom; //寄件者信箱，也可以與寄信的帳號一樣
        $this->FromName = self::$mFromName; //寄件者姓名
        $this->Subject = $subject;  //郵件標題
        $this->Body = $content; // 郵件內容
        $this->IsHTML(true); //郵件內容為html ( true || false)
        $this->AddAddress( $email ); //收件者郵件及名稱，信要寄到哪個信箱

        if( !$this->Send() ) {
            return FALSE;
        }

        return TRUE;
    }
}

//==============================================================================
//Example:
//
//   set_time_limit(2000);//設定PHP執行時間
//   $mailer = new KonoValidateMailer();
//   $mailer->GmailSend( 'xianyee.xing@thekono.com', $con_arr);
//
//==============================================================================
?>
