import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()


url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)


def get_supabase():
    return supabase


def get_all_products():
    response = supabase.table('product_catalog').select('*').execute()
    return  response.data

