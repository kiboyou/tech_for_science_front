"use client";
import { useEffect, useState } from "react";
import { api, AtelierDTO, BlogPostDTO, InfoDTO, TeamMemberDTO } from "./api";

export function useAteliers() {
  const [data, setData] = useState<AtelierDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { api.getAteliers().then(setData).catch(e=>setError(String(e))).finally(()=>setLoading(false)); }, []);
  return { data, loading, error };
}

export function useBlogPosts() {
  const [data, setData] = useState<BlogPostDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { api.getBlogPosts().then(setData).catch(e=>setError(String(e))).finally(()=>setLoading(false)); }, []);
  return { data, loading, error };
}

export function useEquipe() {
  const [data, setData] = useState<TeamMemberDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { api.getEquipe().then(setData).catch(e=>setError(String(e))).finally(()=>setLoading(false)); }, []);
  return { data, loading, error };
}

export function useInfos(type?: string) {
  const [data, setData] = useState<InfoDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { api.getInfos(type).then(setData).catch(e=>setError(String(e))).finally(()=>setLoading(false)); }, [type]);
  return { data, loading, error };
}
