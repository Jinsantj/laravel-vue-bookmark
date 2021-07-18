<?php

namespace App\Http\Controllers;

use App\Models\Url;
use App\Models\Category;
use Illuminate\Http\Request;
use OpenGraph;
use Illuminate\Support\Facades\Auth;

class UrlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Url::where('user_id', Auth::user()->id)->latest()->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function category(Category $Category)
    {
        $urls = Url::where('category_id', $Category->id)->latest()->get();
        return $urls;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate(request(), [
            'name' => 'required',
            'url' => 'required',
            'category' => 'required'
        ]);

        $ogarray = OpenGraph::fetch($request->url);

        if(isset($ogarray['image'])) {

            $ogImage = $ogarray['image'];
        }
        else 
        {
            $ogImage = asset('/images/image_placeholder.jpg');
        }

        if(isset($ogarray['description'])) {

            $ogdescription = $ogarray['description'];
        }
        else 
        {
            $ogdescription = " hey have a look at what you have bookmarked recently.";
        }

        $url = Url::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'url' => $request->url,
            'ogImage' => $ogImage,
            'description' => $ogdescription,
            'category_id' => $request->category
        ]);

        return $url;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Url  $url
     * @return \Illuminate\Http\Response
     */
    public function show(Url $url)
    {
        return $url;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Url  $url
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Url $url)
    {
        return $url->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Url  $url
     * @return \Illuminate\Http\Response
     */
    public function destroy(Url $url)
    {
        $url->delete();
        return $url;
    }
}
