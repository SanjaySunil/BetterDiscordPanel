/**
 * @file replaceMarkdown.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function replaceMarkdown(text, markdown, start, end, join) {
  if (text === '' || !text.includes(markdown)) {
    return text;
  } else {
    const content = text.split(markdown);
    if (content.length > 2) {
      for (let i = 0; i < content.length; i++) {
        if (i !== 0 && i % 2 !== 0 && content[i] !== '') {
          content[i] = start + content[i] + end;
        } else if (i !== 0 && i % 2 !== 0 && content[i] === '') {
          content[i] = join + join;
        }
      }
      return content.join('');
    } else {
      return content.join(join);
    }
  }
}
