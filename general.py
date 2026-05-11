def word_search(grid: list[list[str]], word: str) -> bool:
    # Escribe tu solución aquí
    """
    1. Lista de ubicaciones visitada
    2. Buscar letras están en el grid
    3. Buscar en ubicaciones adyacentes
    """
    locations = set()
    for letter in word:
        if letter in grid:
            

    return True


print(word_search([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"))