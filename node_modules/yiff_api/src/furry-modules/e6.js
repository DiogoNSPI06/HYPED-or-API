const { EventEmitter } = require('events');
let e6_config = {
	pach: "https://e621.net/",
	pach1:"https://e926.net/"
};

const ops = { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } };
const fetch = require('node-fetch');
// require('node-fetch');

function getOne(haystack, arr) {
	return arr.find(v => haystack.includes(v));
}
function findOne(haystack, arr) {
	return arr.some(v => haystack.includes(v));
}

class e6 extends EventEmitter {
	constructor(opinions) {
		super();
		if (!opinions) {
			opinions = {};
		}
		this.getdata = fetch
		this.blacklist = opinions.blacklist;
		if (!this.blacklist) {
			this.blacklist = [];
		}
		this.opts = {
			blacklist: this.blacklist
		};
	}
	async getposts(pos, limit, page) {
		if (pos && !Array.isArray(pos)) pos = pos.split(' ');

		if (pos && pos.length > 40)
			throw new TypeError('You may only supply up to 40 tags.');

		if (limit && limit > 320)
			throw new TypeError('You may only request up to 320 posts at a time.');

		let e621 = e6_config.pach;
		let a = `${pos ? `tags=${pos.join('+')}` : ''}${
			limit ? `&limit=${limit}` : ''
		}${page ? `&page=${page}` : ''}`;

		let result = e621 + 'posts.json?' + a;
		let vc = await this.getdata(result,ops);
		return vc.json()
	}
	async randompost(tags) {
		var { posts } = await this.getposts(tags);
		let result1 = posts[Math.floor(Math.random() * posts.length)];
		let result = result1;
		let tags1 = result.tags.general.concat(
			result.tags.species,
			result.tags.character,
			result.tags.copyright,
			result.tags.artist,
			result.tags.invalid,
			result.tags.lore,
			result.tags.meta
		);

		let blacklist1 = this.opts.blacklist;
		if (tags1) {
			if (findOne(blacklist1, tags1)) {
				let findtags = getOne(blacklist1, tags1);
				result1 = {
					error: 320,
					blacklisTags: blacklist1,
					TagsFind: tags1,
					blacklisTagsResult: findtags,
					post: {
						id: result.id,
						file: result.file.url,
						fileLINK: `${e6_config.pach}posts/${result.id}`
					},
					message: 'to a tag that is on the blacklist in the publication!'
				};
			}
		}
		return result1;
	}
	async getpostsbyID(id) {
		if (!parseInt(id)) throw new Error('invalis ID: ' + id + '');
		let e6 = e6_config.pach;
		var link = `posts/${id}.json`;
		var objJson = e6 + link;
		let result2 = await this.getdata(objJson, ops);

		return result2.json();
	}
	async getpostByMD5(md5) {
		if (!md5 || md5.length !== 32) throw new TypeError('Invalid md5 provided.');

		let e6 = e6_config.pach;
		var link = `posts.json?md5=${md5}`;
		var objJson = e6 + link;
		let result3 = await this.getdata(objJson, ops);

		return result3.json();
	}
}

module.exports = e6;