/**
 * @file contentReplacement.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function contentReplacement(content, links) {
  // noinspection HtmlUnknownTarget
  content = escapeHtml(content)
      .replace(/\n/g, '<br>')
      .replace(
          /(&lt;a:(.*?):(\d{18})&gt;)/g,
          `<img title="\$2" alt="" class="smallEmojiImg" src="https://cdn.discordapp.com/emojis/\$3" onclick="addText('\$1')">`,
      )
      .replace(
          /(&lt;:(.*?):(\d{18})&gt;)/g,
          `<img title="\$2" alt="" class="smallEmojiImg" src="https://cdn.discordapp.com/emojis/\$3" onclick="addText('\$1')">`,
      )
      .replace(/\[(.*)]\((.*)\)/g, `<a href="\$2" target="_blank">\$1</a>`);

  [...content.matchAll(/&lt;@!(\d{18})&gt;/g)].forEach((match) => {
    const user = client.users.cache.find((user) => user.id === match[1]);
    if (user) {
      content = content.replace(match[0], `@${user.username}`);
    }
  });

  if (links && links.length > 0) {
    [...new Set(links)].forEach((link) => {
      content = content.replace(
          link,
          `<a href="${link}" target="_blank">${link}</a>`,
      );
    });
  }

  content = replaceMarkdown(content, '***', '<b><em>', '</em></b>', '***');
  content = replaceMarkdown(content, '**', '<b>', '</b>', '&ast;&ast;');
  content = replaceMarkdown(content, '*', '<em>', '</em>', '&ast;');
  content = replaceMarkdown(content, '__', '<u>', '</u>', '&lowbar;&lowbar;');
  content = replaceMarkdown(content, '~~', '<s>', '</s>', '&tilde;&tilde;');
  content = replaceMarkdown(
      content,
      '```',
      '<div class=\'codeBlock\'>',
      '</div>',
      '```',
  );
  content = replaceMarkdown(
      content,
      '`',
      '<div class=\'code\'>',
      '</div>',
      '&grave;',
  );
  return content;
}
