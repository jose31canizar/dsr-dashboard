'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// welcome, to the
//
//  d8b                        d8b
//  ?88                        ?88
//   88b                        88b
//   888888b  d888b8b   d8888b  888  d88'
//   88P `?8bd8P' ?88  d8P' `P  888bd8P'
//  d88   88P88b  ,88b 88b     d88888b
// d88'   88b`?88P'`88b`?888P'd88' `?88b,
//
// d88888P  d8888b   88bd88b  d8888b
//    d8P' d8P' ?88  88P' ?8bd8b_,dP
//  d8P'   88b  d88 d88   88P88b
// d88888P'`?8888P'd88'   88b`?888P'
//
// Replace MarkdownIt's internal HTML regexes with JSX-friendly ones
var markdownItHtmlRegexes = require('markdown-it/lib/common/html_re');
Object.keys(markdownItHtmlRegexes).forEach(function (regexName) {
  var regex = markdownItHtmlRegexes[regexName];
  // this adds support for the `.` character within tag names
  markdownItHtmlRegexes[regexName] = new RegExp(regex.source.replace(/\[A-Za-z\]\[A-Za-z0-9\\-\]\*/g, '[A-Za-z][A-Za-z0-9\\.\\-]*'), regex.flags);
});

exports.default = require('markdown-it');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qc3gtZnJpZW5kbHktbWFya2Rvd24taXQuanMiXSwibmFtZXMiOlsibWFya2Rvd25JdEh0bWxSZWdleGVzIiwicmVxdWlyZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVnZXhOYW1lIiwicmVnZXgiLCJSZWdFeHAiLCJzb3VyY2UiLCJyZXBsYWNlIiwiZmxhZ3MiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSx3QkFBd0JDLFFBQVEsZ0NBQVIsQ0FBOUI7QUFDQUMsT0FBT0MsSUFBUCxDQUFZSCxxQkFBWixFQUFtQ0ksT0FBbkMsQ0FBMkMsVUFBQ0MsU0FBRCxFQUFlO0FBQ3hELE1BQU1DLFFBQVFOLHNCQUFzQkssU0FBdEIsQ0FBZDtBQUNBO0FBQ0FMLHdCQUFzQkssU0FBdEIsSUFBbUMsSUFBSUUsTUFBSixDQUNqQ0QsTUFBTUUsTUFBTixDQUFhQyxPQUFiLENBQ0UsK0JBREYsRUFFRSw0QkFGRixDQURpQyxFQUtqQ0gsTUFBTUksS0FMMkIsQ0FBbkM7QUFPRCxDQVZEOztrQkFZZVQsUUFBUSxhQUFSLEMiLCJmaWxlIjoianN4LWZyaWVuZGx5LW1hcmtkb3duLWl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gd2VsY29tZSwgdG8gdGhlXG4vL1xuLy8gIGQ4YiAgICAgICAgICAgICAgICAgICAgICAgIGQ4YlxuLy8gID84OCAgICAgICAgICAgICAgICAgICAgICAgID84OFxuLy8gICA4OGIgICAgICAgICAgICAgICAgICAgICAgICA4OGJcbi8vICAgODg4ODg4YiAgZDg4OGI4YiAgIGQ4ODg4YiAgODg4ICBkODgnXG4vLyAgIDg4UCBgPzhiZDhQJyA/ODggIGQ4UCcgYFAgIDg4OGJkOFAnXG4vLyAgZDg4ICAgODhQODhiICAsODhiIDg4YiAgICAgZDg4ODg4YlxuLy8gZDg4JyAgIDg4YmA/ODhQJ2A4OGJgPzg4OFAnZDg4JyBgPzg4Yixcbi8vXG4vLyBkODg4ODhQICBkODg4OGIgICA4OGJkODhiICBkODg4OGJcbi8vICAgIGQ4UCcgZDhQJyA/ODggIDg4UCcgPzhiZDhiXyxkUFxuLy8gIGQ4UCcgICA4OGIgIGQ4OCBkODggICA4OFA4OGJcbi8vIGQ4ODg4OFAnYD84ODg4UCdkODgnICAgODhiYD84ODhQJ1xuLy9cbi8vIFJlcGxhY2UgTWFya2Rvd25JdCdzIGludGVybmFsIEhUTUwgcmVnZXhlcyB3aXRoIEpTWC1mcmllbmRseSBvbmVzXG5jb25zdCBtYXJrZG93bkl0SHRtbFJlZ2V4ZXMgPSByZXF1aXJlKCdtYXJrZG93bi1pdC9saWIvY29tbW9uL2h0bWxfcmUnKTtcbk9iamVjdC5rZXlzKG1hcmtkb3duSXRIdG1sUmVnZXhlcykuZm9yRWFjaCgocmVnZXhOYW1lKSA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gbWFya2Rvd25JdEh0bWxSZWdleGVzW3JlZ2V4TmFtZV07XG4gIC8vIHRoaXMgYWRkcyBzdXBwb3J0IGZvciB0aGUgYC5gIGNoYXJhY3RlciB3aXRoaW4gdGFnIG5hbWVzXG4gIG1hcmtkb3duSXRIdG1sUmVnZXhlc1tyZWdleE5hbWVdID0gbmV3IFJlZ0V4cChcbiAgICByZWdleC5zb3VyY2UucmVwbGFjZShcbiAgICAgIC9cXFtBLVphLXpcXF1cXFtBLVphLXowLTlcXFxcLVxcXVxcKi9nLFxuICAgICAgJ1tBLVphLXpdW0EtWmEtejAtOVxcXFwuXFxcXC1dKidcbiAgICApLFxuICAgIHJlZ2V4LmZsYWdzXG4gICk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVxdWlyZSgnbWFya2Rvd24taXQnKTtcbiJdfQ==