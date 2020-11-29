const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const handlebars = require('gulp-compile-handlebars');
const htmlmin = require('gulp-htmlmin');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const csvparse = require('csv-parse/lib/sync');
const message_csv_file = 'src/messages.csv';
const fs = require('fs').promises;

const countries = require("i18n-iso-countries");

const imagemin = require('gulp-imagemin');

function minifycss() {
    return src('src/*.css')
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist'));
}

async function build_html() {
    let message_data = []

    let content = await fs.readFile(message_csv_file);
    let records = csvparse(content, { from_line: 2 });

    records.map(
        record => {
            let timestamp = record[0];
            let username = record[1].trim();
            let twitter = record[3].trim();
            let country = record[4];
            let message = record[5];
            let message_jp = record[8];

            let country_code = '';
            let country_name = '';

            if (record[6] !== '') {
                message = record[6];
            }
            
            if (country) {
                search_country_code = countries.getAlpha2Code(country, 'en');
                if (search_country_code) {
                    country_code = search_country_code.toLowerCase();
                    country_name = countries.getName(search_country_code, "en") + ' / ' + countries.getName(search_country_code, "ja");
                }
            }

            // https://stackoverflow.com/questions/15033196/using-javascript-to-check-whether-a-string-contains-japanese-characters-includi/15034560
            var jpCharacters = message.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/);

            // if there isn't a match, then message is not in Japanese, pass this value to the handlebars file. 
            // if there is no JP character and translation is not provided, then the message is in JP
            var isMsgInJP = !(jpCharacters === null) && record[6] === ""

            
            if (twitter.startsWith("@") || twitter.startsWith("＠")) {
                twitter = twitter.substring(1);
            }

            message_row = {
                timestamp: timestamp,
                username: username,
                twitter: twitter,
                country: country,
                country_name: country_name,
                country_code: country_code,
                message: message,
                isMsgInJP: isMsgInJP,
                message_jp: message_jp
            };
            message_data.push(message_row);
        }
    );

    // Cover.png
    // Page_1.png
    // Page_10-11.png
    // Page_12-13.png
    // Page_14-15.png
    // Page_16-17.png
    // Page_18-19.png
    // Page_2-3.png
    // Page_20-21.png
    // Page_22-23.png
    // Page_24.png
    // Page_4-5.png
    // Page_6-7.png
    // Page_8-9.png

    // ori, thumbnail name
    let artbook_data = [
        {
            fullpage: "artbook/Cover.png", 
            thumbnail: "artbook/thumbs/Cover_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Cover_t.jpg",
        },
        {
            fullpage: "artbook/Page_1.png", 
            thumbnail: "artbook/thumbs/Page_1_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_1_t.jpg",
        },
        {
            fullpage: "artbook/Page_2-3.png",
            thumbnail: "artbook/thumbs/Page_2-3_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_2-3_t.jpg",
        },
        {
            fullpage: "artbook/Page_4-5.png",
            thumbnail: "artbook/thumbs/Page_4-5_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_4-5_t.jpg",
        },
        {
            fullpage: "artbook/Page_6-7.png",
            thumbnail: "artbook/thumbs/Page_6-7_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_6-7_t.jpg",
        },
        {
            fullpage: "artbook/Page_8-9.png",
            thumbnail: "artbook/thumbs/Page_8-9_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_8-9_t.jpg",
        },
        {
            fullpage: "artbook/Page_10-11.png",
            thumbnail: "artbook/thumbs/Page_10-11_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_10-11_t.jpg",
        },
        {
            fullpage: "artbook/Page_12-13.png",
            thumbnail: "artbook/thumbs/Page_12-13_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_12-13_t.jpg",
        },
        {
            fullpage: "artbook/Page_14-15.png",
            thumbnail: "artbook/thumbs/Page_14-15_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_14-15_t.jpg",
        },
        {
            fullpage: "artbook/Page_16-17.png",
            thumbnail: "artbook/thumbs/Page_16-17_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_16-17_t.jpg",
        },
        {
            fullpage: "artbook/Page_18-19.png",
            thumbnail: "artbook/thumbs/Page_18-19_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_18-19_t.jpg",
        },
        {
            fullpage: "artbook/Page_20-21.png",
            thumbnail: "artbook/thumbs/Page_20-21_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_20-21_t.jpg",
        },
        {
            fullpage: "artbook/Page_22-23.png",
            thumbnail: "artbook/thumbs/Page_22-23_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_22-23_t.jpg",
        },
        {
            fullpage: "artbook/Page_24.png",
            thumbnail: "artbook/thumbs/Page_24_t.jpg",
            thumbnail_small: "artbook/thumbs_small/Page_24_t.jpg",
        }
    ]

    let template_data = {
        messages: message_data,
        artbook_data: artbook_data
    };
    let htmlminoptions = {
        minifyCSS: true,
        minifyJS: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    }

    return src('src/index.handlebars')
        .pipe(handlebars(template_data))
        .pipe(htmlmin(htmlminoptions))
        .pipe(rename('index_dev.html'))
        .pipe(dest('.'));
}

function minifyjs() {
    return src('src/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('dist'))
}

function minifyimg() {
    return src('src/img/**/*')
        .pipe(imagemin([
            imagemin.optipng({
                interlaced: true
            })
        ]))
        .pipe(dest('dist/img'))
}

exports.build_full = series(minifycss, build_html, minifyjs, minifyimg);
exports.build = series(minifycss, build_html, minifyjs);
