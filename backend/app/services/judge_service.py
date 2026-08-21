import subprocess
import tempfile
from pathlib import Path


def run_python_code(
    code: str,
    input_data: str,
    timeout: float = 2.0,
):
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)

        source_file = temp_path / "solution.py"

        source_file.write_text(
            code,
            encoding="utf-8",
        )

        command = [
            "docker",
            "run",
            "--rm",
            "-i",

            # No network access
            "--network",
            "none",

            # Resource limits
            "--cpus",
            "0.5",

            "--memory",
            "128m",

            "--pids-limit",
            "64",

            # Security restrictions
            "--cap-drop",
            "ALL",

            "--security-opt",
            "no-new-privileges",

            # Temporary filesystem
            "--read-only",

            "--tmpfs",
            "/tmp:rw,noexec,nosuid,size=16m",

            # Mount only the submitted source code
            "-v",
            f"{source_file}:/code/solution.py:ro",

            "leetcode-python-runner",
        ]

        try:
            result = subprocess.run(
                command,
                input=input_data,
                text=True,
                capture_output=True,
                timeout=timeout,
            )

        except subprocess.TimeoutExpired:
            return {
                "status": "Time Limit Exceeded",
                "output": "",
            }

        if result.returncode != 0:
            return {
                "status": "Runtime Error",
                "output": result.stderr,
            }

        return {
            "status": "Accepted",
            "output": result.stdout,
        }