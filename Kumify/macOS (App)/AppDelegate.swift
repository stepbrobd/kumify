//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by Yifei Sun on 2025-06-20.
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {

  func applicationDidFinishLaunching(_ notification: Notification) {
    // Override point for customization after application launch.
  }

  func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
    return true
  }

}
