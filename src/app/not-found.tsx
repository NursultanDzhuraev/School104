import Link from "next/link";
export default function NotFound() { return <main className="not-found"><p className="eyebrow">404</p><h1>Барак табылган жок</h1><p lang="ru">Страница не найдена. Проверьте адрес или вернитесь на главную.</p><div className="actions"><Link className="button" href="/kg">Башкы бет</Link><Link className="button secondary" href="/ru">Главная</Link></div></main>; }
