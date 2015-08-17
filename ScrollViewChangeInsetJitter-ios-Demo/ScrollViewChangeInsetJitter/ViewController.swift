//
//  ViewController.swift
//  ScrollViewChangeInsetJitter
//
//  Created by Howard Yeh on 2015-08-17.
//  Copyright © 2015 Howard Yeh. All rights reserved.
//

import UIKit

let HEADER_HEIGHT: CGFloat = 50

class ViewController: UIViewController, UIScrollViewDelegate {

    var scrollView: UIScrollView!

    var topInset: CGFloat = 0 {
        didSet {
            scrollView.contentInset = UIEdgeInsets(
                top: topInset,
                left: 0,
                bottom: 0,
                right: 0)
        }
    }

    class TracingScrollView: UIScrollView {
        override var contentOffset: CGPoint {
            didSet {
                if(contentInset.top == 0 && contentOffset.y != 0) {
                    // Set a breakpoint here to see who's setting contentOffset after
                    // contentInset is set to 0.
                    print(contentOffset)
                }
            }
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()


        let contentRect = CGRectMake(0, 0, view.frame.size.width, view.frame.size.height * 1.4)

        scrollView = TracingScrollView(frame: view.bounds)
        scrollView.delegate = self
        scrollView.contentSize = contentRect.size
        topInset = -HEADER_HEIGHT
        view.addSubview(scrollView)


        let contentView = UIView(frame: contentRect)
        scrollView.addSubview(contentView)


        let image = UIImage(named: "hikers")!
        let imageView = UIImageView(frame: contentRect)
        imageView.image = image
        imageView.contentMode = UIViewContentMode.ScaleAspectFill
        contentView.addSubview(imageView)

        let headerView = UIControl(frame: CGRectMake(0, 0, view.frame.size.width, HEADER_HEIGHT))
        headerView.backgroundColor = UIColor(red: 1, green: 0, blue: 0, alpha: 0.3)
        headerView.addTarget(self, action: "resetInset", forControlEvents: UIControlEvents.TouchUpInside)
        contentView.addSubview(headerView)

        let label = UILabel(frame: headerView.bounds)
        label.text = "Touch to reset inset to -50"
        label.textAlignment = NSTextAlignment.Center
        headerView.addSubview(label)

        // Do any additional setup after loading the view, typically from a nib.
    }

    func resetInset() {
        topInset = -HEADER_HEIGHT
    }

    func scrollViewDidScroll(scrollView: UIScrollView) {
        if(scrollView.contentOffset.y < -0 && topInset != 0) {
            /*
            Changing contentInset while scrolling causes the contentOffset to "jump" from 0 to about -25
            Using debugger to trace setContentOffset suggests that UIScrollView's momentum panGesture handling might
            be compensating for the changed contentInset. The trace is:

            #0  0x0000000100dd8466 in ScrollViewChangeInsetJitter.ViewController.TracingScrollView.contentOffset.didset : C.CGPoint at /Users/howard/ios/react-native/ScrollViewChangeInsetJitter/ScrollViewChangeInsetJitter/ViewController.swift:33
            #1  0x0000000100dd8329 in ScrollViewChangeInsetJitter.ViewController.TracingScrollView.contentOffset.setter : C.CGPoint ()
            #2  0x0000000100dd8236 in @objc ScrollViewChangeInsetJitter.ViewController.TracingScrollView.contentOffset.setter : C.CGPoint ()
            #3  0x000000010189a102 in -[UIScrollView _updatePanGesture] ()

            */
            scrollView.contentInset = UIEdgeInsets(
                top: 0,
                left: 0,
                bottom: 0,
                right: 0)
        }
    }

}

