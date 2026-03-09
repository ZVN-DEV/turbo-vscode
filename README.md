# Turbo Language for VS Code

Syntax highlighting, snippets, and language support for the [Turbo programming language](https://github.com/ZVN-DEV/turbo).

## Features

- Syntax highlighting for `.tb` files
- Code snippets for common patterns
- Bracket matching and auto-closing
- Comment toggling (`//` and `/* */`)
- `turbo.toml` file recognition

## Snippets

| Prefix | Description |
|--------|-------------|
| `main` | Main function |
| `fn` | Function with return type |
| `fnv` | Void function |
| `letm` | Mutable binding |
| `ife` | If-else |
| `while` | While loop |
| `for` | For-in loop |
| `match` | Match expression |
| `struct` | Struct definition |
| `impl` | Impl block |

## Example

```turbo
fn fibonacci(n: i64) -> i64 {
    if n <= 1 {
        n
    } else {
        fibonacci(n - 1) + fibonacci(n - 2)
    }
}

fn main() {
    let result = fibonacci(10)
    print(result)
}
```
