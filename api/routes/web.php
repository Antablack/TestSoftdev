<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManagerStatic as Image;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/moviesxtheaters/{id}',function($id){
    return DB::table("movies")
    ->join("moviesxtheaters","moviesxtheaters.MOVIEID","=","movies.MOVIEID")
    ->where("moviesxtheaters.THEATERSID","=",$id)
    ->select("movies.*")
    ->get();
});

Route::get('/getallmovies',function(){
    return DB::table("movies")->get();
});

Route::get('/movies/{id}',function($id){
    return DB::table("movies")
    ->where("MOVIEID","=",$id)
    ->get();
});

Route::post("/movies",function(Request  $req){
     try{ 
        DB::table('movies')->insert([
            "NAME"=>$req->input("name"),
            "RELEASEDATE"=>$req->input("releasedate"),
            "LENGUAGE"=>$req->input("lenguage"),
            "IMAGE"=> $req->file('image')->store('images')]);
        return "success";
     }catch(Exception $ex){
        return "error";
    } 
});
Route::post("/movies/{id}",function(Request $req,$id){
    try{ 
    DB::table('movies')
    ->where('MOVIEID',$id)
    ->update([
        "NAME" => $req->input("name"),
        "RELEASEDATE"=>$req->input("releasedate"),
        "LENGUAGE"=>$req->input("lenguage"),
        "IMAGE"=> $req->file('image')->store('images')]);
        return "success";
    }catch(Exception $ex){
       return "error";
   } 
});

Route::delete("/movies/{id}",function($id){
    try{
        DB::table("movies")->where("MOVIEID","=",$id)->delete();
        DB::table("moviesxtheaters")->where("MOVIEID","=",$id)->delete(); 
        return "success";
    }catch(Exception $ex){
        return "error";
    }
});

Route::get("/images/{filename}",function($filename){
    return Image::make(storage_path('app\\images\\' . $filename))->response(); 
});


Route::get("/theaters/{id}",function($id){
    return DB::table("theaters")
            ->where("THEATERSID","=",$id)
            ->get();
});

Route::get("/getalltheaters",function(){
    return DB::table("theaters")
            ->get();
});

Route::delete("/theaters/{id}",function($id){
    try{
        DB::table("theaters")->where("THEATERSID","=",$id)->delete();
        DB::table("moviesxtheaters")->where("THEATERSID","=",$id)->delete(); 
        return "success";
    }catch(Exception $ex){
        return "error";
    }
});

Route::post("/theaters/{id}",function(Request $req,$id){
    try{
        DB::table("theaters")
            ->where("THEATERSID","=",$id)
            ->update([
            "NAME"=>$req->input("name"),
            "LOCATION"=>$req->input("location")]);

            DB::table("moviesxtheaters")
            ->where("THEATERSID","=",$id)
            ->delete();

            $movies=json_decode($req->input("movies"));
            if(count($movies)>0){
                foreach($movies as $item){
                    DB::table("moviesxtheaters")
                    ->insert(["MOVIEID"=>$item,"THEATERSID"=>$id]);
                }
            }
        return "success";
    }catch(Exception $ex){
        return "error";
    }
});


Route::post("/theaters",function(Request $req){
     try{ 
     $id= DB::table("theaters")->insertGetId([
            "NAME"=>$req->input("name"),
            "LOCATION"=>$req->input("location")]);
             $movies=json_decode($req->input("movies"));
             if(count($movies)>0){
                foreach($movies as $item){
                    DB::table("moviesxtheaters")
                    ->insert(["MOVIEID"=>$item,"THEATERSID"=>$id]);
                }
            }
        return "success";
      }catch(Exception $ex){
        return "error";
    }  
});