import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { noteService } from '../../services/noteService';
import { format } from 'date-fns';
import { Search as SearchIcon, FileText } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async (q) => {
    try {
      setLoading(true);
      const data = await noteService.search(q);
      setResults(data || []);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="bg-yellow-200 font-bold">{part}</span> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={28} />
          <input
            type="text"
            className="w-full text-2xl py-4 pl-14 pr-6 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition shadow-sm"
            placeholder="Search in your notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-center text-gray-500 my-10">Searching...</div>
        ) : query && results.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <SearchIcon size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-xl">No notes found for "{query}"</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map(note => (
              <Link to={`/notes/${note._id}`} key={note._id} className="card p-5 hover:shadow-md transition">
                <h3 className="font-bold text-xl mb-2 text-blue-900">{highlightText(note.title, query)}</h3>
                <p className="text-gray-700 line-clamp-3 mb-3">{highlightText(note.content, query)}</p>
                <div className="text-xs text-gray-400">
                  Updated: {format(new Date(note.updatedAt || Date.now()), 'MMM d, yyyy')}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
