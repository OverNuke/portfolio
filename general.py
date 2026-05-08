def word_search(grid: list[list[str]], word: str) -> bool:
    # Escribe tu solución aquí
    """
    1. Lista de ubicaciones visitada
    2. Buscar letras están en el grid
    3. Buscar en ubicaciones adyacentes
    """
    for letter in word:
        if letter not in grid:
            return False

    return True


print(word_search([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"))