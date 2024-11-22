<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::orderByDesc('id')->paginate(8));
        return Inertia::render('Home', [
            'news' => $news,
            'tittleHead' => 'Home Page',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:2',
            'description' => 'required',
            'category' => 'required',
        ]);

        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = Auth::user()->name;
        $news->save();


        // $validatedData = $request->validate([
        //     'title' => 'required|min:1',
        //     'description' => 'required|min:1',
        //     'category' => 'required|min:1',
        // ]);
        // $validatedData['author'] = Auth::user()->name;
        // News::create($validatedData);


        return redirect()->back()->with('message', 'News created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        // $myNews = $news::all();
        
        $myNews = News::where('author', Auth::user()->name)->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        //
    }
}
