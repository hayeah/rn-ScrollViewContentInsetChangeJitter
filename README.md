# "Pull To Refresh" Jitter

This demo manipulates a UIScrollView's contentInset to implement the "Pull to Refresh" UI. It showcases the jitter that occurs when contentInset is set, and scrolling is ongoing.

# Video Demo

[![](https://i.ytimg.com/vi/s7AtL673v4U/hqdefault.jpg)](https://youtu.be/s7AtL673v4U)

Start with negative contentInset to hide refresh header.

![](doc/ptr-01.jpg)

Scroll until there is enough space to contain the "pull to refresh" header, then set contentInset to 0.

![](doc/ptr-02.jpg)

Setting contentInset to 0 causes offset to "jump".

![](doc/ptr-03.jpg)

On touch release, it scrolls back to 0 as expected.

![](doc/ptr-04.jpg)

