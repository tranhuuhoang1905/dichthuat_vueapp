<?php
namespace App\Traits;

trait StringHelper {

    public function splitWord($string){
        $string = str_replace([ ",",";",".","!","，","；","。","！","\\n"],",", $string);
        $array = explode(",", $string);
        $array = array_filter($array, 'strlen');
        return $array;
    }
    public function splitWordTranslate($string){
        $pattern = '/(，|【|】|:)/u'; // biểu thức chính quy để tách chuỗi
        $array = preg_split($pattern, $string, -1, PREG_SPLIT_DELIM_CAPTURE);
        return $array;
    }

    public function removeEmptyElements($words) {
        // $words = ["hoàng trần", "hoàng trần-1", "abc-123-xyz", "def-456", "", "hoàng trần"];
        $words = array_map(function($word) {
            return preg_replace("/-\d+/", "", $word);
            }, $words);
        $words = array_values(array_filter($words));
        $words = array_unique($words);
        return $words;
    }
    public function splitWordExport($str){
        // $str = "thanh long-2 hoang3 .dep trai-3";
        // Tách chuỗi thành một mảng các chuỗi con bởi dấu "-"
        $substrs = explode('-', $str);
        
        return $substrs;
    }
}
