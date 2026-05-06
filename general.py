def top_n_words(text: str, n: int) -> list[str]:
    words = set(text.lower().split())
    return sorted([(w,text.lower().count(w)) for w in words], reverse=True, key=lambda x : x[1])[:n] 
    if n < len(words) else list(words)
    
print(top_n_words("the quick brown fox jumps Over The lazy dog", 3))
print(top_n_words("a b a b c", 2))

