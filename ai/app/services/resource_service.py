import os
import httpx


class ResourceService:

    def get_available_resources(self) -> list[dict]:
        backend_url = os.getenv(
            "BACKEND_URL",
            "http://localhost:3000",
        )

        try:
            with httpx.Client(timeout=5.0) as client:
                response = client.get(
                    f"{backend_url}/resources",
                )

                response.raise_for_status()

                return response.json()

        except Exception as error:
            print(
                f"[ResourceService] Failed to fetch resources: {error}"
            )

            return []