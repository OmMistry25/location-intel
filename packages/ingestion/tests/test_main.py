from ingestion import hello


def test_hello() -> None:
    assert hello() == "Hello from location-intel ingestion."
