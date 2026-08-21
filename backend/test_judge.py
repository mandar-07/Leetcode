from app.services.judge_service import run_python_code


code = """
import urllib.request

urllib.request.urlopen("https://example.com")
"""
result = run_python_code(
    code,
    "mandar\n",
)

print(result)