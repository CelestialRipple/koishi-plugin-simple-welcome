"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = 'welcome';
exports.Config = koishi_1.Schema.object({
group: koishi_1.Schema.array(koishi_1.Schema.object({
number: koishi_1.Schema.string().description('群号').required(),
words: koishi_1.Schema.string().description('欢迎词').default('欢迎你入群！\n期待与你一起成长！'),
})).description('添加需要欢迎的群组'),
});

async function apply(ctx, config) {
ctx.on('guild-member-added', async (session) => {
const { group } = config;
for (const { number, words } of group) {
if (session.guildId === number) {
session.send(koishi_1.segment.at(session.username) + '\n' + words);
break;
}
}
});
}

exports.apply = apply;