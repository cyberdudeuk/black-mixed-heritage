#!/usr/bin/env python3
"""Collect the external links the hub cites, one per line, for the monthly link check.

Usage: python3 scripts/collect_links.py dist/bhm-2026-hub.html > links.txt
       python3 scripts/collect_links.py --self-test

Trailing punctuation from the surrounding prose is dropped, but a closing bracket is kept when the
link opened one: Wikipedia titles such as Jerry_Lawson_(engineer) end in ")". The shell pipeline this
replaces stripped every trailing ")" and reported those pages as 404 (black-mixed-heritage#29).
"""

import re
import sys

URL = re.compile(r"https://[A-Za-z0-9._~:/?#@!$&()*+,;=%-]+")
SKIP = re.compile(r"fonts\.(googleapis|gstatic)\.com|cyberdudeuk\.github\.io|schema\.org|w3\.org")


def trim(url):
    while url and url[-1] in "),.;:":
        if url[-1] == ")" and url.count("(") >= url.count(")"):
            break
        url = url[:-1]
    return url


def collect(text):
    links = {trim(u) for u in URL.findall(text)}
    return sorted(u for u in links if u and "$" not in u and not SKIP.search(u))


def self_test():
    page = 'See <a href="https://en.wikipedia.org/wiki/Jerry_Lawson_(engineer)">x</a> and (https://example.org/a). Also https://example.org/b, https://fonts.gstatic.com/f and https://example.org/${x}'
    got = collect(page)
    assert got == ["https://en.wikipedia.org/wiki/Jerry_Lawson_(engineer)", "https://example.org/a", "https://example.org/b"], got
    # deliberate break: the old rule (strip every trailing ")") loses the bracket
    assert re.sub(r"[),.;:]+$", "", "https://en.wikipedia.org/wiki/Jerry_Lawson_(engineer)") != got[0]
    assert trim("https://example.org/x_(y))") == "https://example.org/x_(y)"


if __name__ == "__main__":
    self_test()
    if sys.argv[1:] == ["--self-test"]:
        print("PASS collect_links self-test (balanced brackets kept, prose punctuation dropped, deliberate break)")
    else:
        with open(sys.argv[1], encoding="utf-8") as f:
            print("\n".join(collect(f.read())))
