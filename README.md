Vinny's Veincation
==================

Vinny's Veincation is a 2D sidescrolling platformer game written in Javascript using either WebGL or html5 canvas. It was written by a team of three at SDHacks 2015 mainly as a learning experience.

## Dependencies

* **[Phaser](http://phaser.io/)** - Used to handle graphics and physics.

## Usage
Since gamefiles are loaded from the server (in your case, your local machine), running this game requires that an http server be created under the ```src``` directory.

    $ git clone git@github.com:fsxfreak/vinnys-veincation.git
    $ cd vinnnys-veincation/src
    $ python -m SimpleHTTPServer

Navigating to the correct address as hosted by the server will allow you to run the game (e.g. ```localhost:8000```).

## License

The MIT License (MIT)

Copyright (c) 2015 Leon Cheung, Anne Marie Hoskins, Nisha Yerunkar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
