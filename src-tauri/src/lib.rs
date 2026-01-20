// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::process::Command;

#[tauri::command]
fn scan_directory(path: Option<String>) -> String {
    println!("scan_directory called");
    
    let target = path.unwrap_or_else(|| {
        std::env::var("HOME").unwrap_or_else(|_| "/".to_string())
    });

    let output = Command::new("sh")
        .arg("-c")
        .arg(format!("du -sh {}/*", target))
        .output()
        .expect("failed to run du");

    let result = String::from_utf8_lossy(&output.stdout).to_string();
    println!("Result: {}", result); 
    result

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![scan_directory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
