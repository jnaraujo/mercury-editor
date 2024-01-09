// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env, fs, path::Path};

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn main() {
    let mut file_path = String::new();
    let args: Vec<String> = env::args().collect();
    println!("Argumentos passados: {:?}", args);

    if args.len() == 2 {
        let args_file_path = args[1].clone();
        let absolute_path = fs::canonicalize(args_file_path.clone()).unwrap();

        let path_exists = Path::new(&absolute_path).exists();

        if path_exists {
            file_path = absolute_path.to_str().unwrap().to_string();
        }
    }

    tauri::Builder::default()
        .setup(move |app| {
            let window = app.get_window("main").unwrap();
            let cloned_window = window.clone();

            cloned_window.listen("startup", move |_| {
                println!("Startup event received from JS");
                
                window.emit("file_path", Payload { message: file_path.clone() }).unwrap();
            });

            Ok(())

        })
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
