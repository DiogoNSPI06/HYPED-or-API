Hi!!
and welcome to a SUPER yiff bookstore !!
with various functions and etc!
OwO

how to use?

```js
var yiff = require("yiff_api")
var y = new yiff.<event>([opitions])

y.<subEvent>
```

`<...> = required`

`[...] = optional`

`event` = event to get "yiffs"

`opitions` = options depending on the EVENT

`subEvent` = sub event

----

# existing events:

**e621** = search on e621

**e926** = search on e926

**yiff** = random yiff

---

# existing options:

**blacklist** = tag list you don't want (works only on EVENT e621 and e926)

---

# sub events:

### e621
| Function | Description |
| -------- | ----------- |
| `getposts(tags, limit, page)` | get e621 publications |
| `randompost(tags)` | randomize a post |
| `getpostsbyID(id)` | get a post from the id |
| `getpostByMD5(md5)` | get a post from the MD5 |
| -------- | -------- |

examples:
```js
var yiff = require("yiff_api")
var y = new yiff.e621({blacklist:["vore","oral_vore","gore"]})//blacklist


//getposts
y.getposts("toriel").then(console.log)
y.getposts("toriel",2).then(console.log)
y.getposts("toriel",2,9).then(console.log)
//array
y.getposts(["toriel"]).then(console.log)
y.getposts(["toriel"],1).then(console.log)
y.getposts(["toriel"],2,10).then(console.log)
//more tags
y.getposts(["toriel","animal_bikini"]).then(console.log)
y.getposts(["toriel","animal_bikini"],1).then(console.log)
y.getposts(["toriel","animal_bikini"],2,8).then(console.log)


//randompost
y.randompost("toriel").then(console.log)
//more tags
y.randompost(["toriel","-human"]).then(console.log)

//getpostsbyID
y.getpostsbyID(847294).then(console.log)

//getpostByMD5
y.getpostByMD5("6fd0b0f2237543bfeee5ca9318a97b46").then(console.log)
```


### e926
| Function | Description |
| -------- | ----------- |
| `getposts(tags, limit, page)` | get e926 publications |
| `randompost(tags)` | randomize a post |
| `getpostsbyID(id)` | get a post from the id |
| `getpostByMD5(md5)` | get a post from the MD5 |
| -------- | -------- |

examples:
```js
var yiff = require("yiff_api")
var y = new yiff.e926({blacklist:["vore","oral_vore","gore"]})//blacklist


//getposts
y.getposts("toriel").then(console.log)
y.getposts("toriel",2).then(console.log)
y.getposts("toriel",2,9).then(console.log)
//array
y.getposts(["toriel"]).then(console.log)
y.getposts(["toriel"],1).then(console.log)
y.getposts(["toriel"],2,10).then(console.log)
//more tags
y.getposts(["toriel","animal_bikini"]).then(console.log)
y.getposts(["toriel","animal_bikini"],1).then(console.log)
y.getposts(["toriel","animal_bikini"],2,8).then(console.log)


//randompost
y.randompost("toriel").then(console.log)
//more tags
y.randompost(["toriel","-human"]).then(console.log)

//getpostsbyID
y.getpostsbyID(40242).then(console.log)

//getpostByMD5
y.getpostByMD5("6fd0b0f2237543bfeee5ca9318a97b46").then(console.log)
```

### yiff
| Function | Description |
| -------- | ----------- |
| `gay()` | gay yiffs |
| `straight()` | straight yiffs |
| `lesbian()` | lesbian yiffs |
| `synormorph()` | synormorph yiffs |
| `bulge()` | bulge yiffs |
| `andromorph()` | andromorph yiffs |
| `butts()` | butts fursuits |
| -------- | ----------- |

examples:
```js
var yiff = require("yiff_api")
var y = new yiff.yiff()

y.gay().then(console.log)

y.straight().then(console.log)

y.lesbian().then(console.log)

y.synormorph().then(console.log)

y.bulge().then(console.log)

y.andromorph().then(console.log)

y.butts().then(console.log)
```

---

## examples:
```js
var yiff = require("yiff_api")
var y = new yiff.yiff()
let y_1 = new yiff.e621()

y_1.getposts('toriel').then(x => {
	var { posts } = x;
	if (!posts) {
		console.log('no post :(');
	} else {
		console.log(posts);
	}
});

y.gay().then(console.log)
```

## async / await:
```js
var yiff = require("yiff_api")
let y = new yiff.e621()

async function main() {
	let x = await y.getposts('toriel');

	var { posts } = x;
	if (!posts) {
		console.log('no post :(');
	} else {
		console.log(posts);
	}
}
main()
```

suport on "INSURES" for git