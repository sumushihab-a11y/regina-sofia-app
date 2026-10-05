#!/usr/bin/env bash
set -u

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" 2>/dev/null && pwd)" || { echo "Errore: impossibile determinare la cartella dello script." >&2; exit 1; }
ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." 2>/dev/null && pwd)" || { echo "Errore: impossibile determinare la root prevista." >&2; exit 1; }
cd -- "$ROOT" || { echo "Errore: impossibile entrare nella root prevista." >&2; exit 1; }

command -v git >/dev/null 2>&1 || { echo "Errore: git non disponibile." >&2; exit 1; }
command -v gh >/dev/null 2>&1 || { echo "Errore: GitHub CLI (gh) non disponibile." >&2; exit 1; }

TOP="$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "Errore: questa cartella non e' un repository Git esistente." >&2; exit 1; }
TOP="$(CDPATH= cd -- "$TOP" 2>/dev/null && pwd)" || { echo "Errore: root Git non accessibile." >&2; exit 1; }
[ "$TOP" = "$ROOT" ] || { echo "Errore: la root Git non coincide con la root prevista; operazione annullata." >&2; exit 1; }

[ -f "downloads/Regina-Sofia-anteprima.apk" ] || { echo "Errore: manca downloads/Regina-Sofia-anteprima.apk." >&2; exit 1; }

if git remote get-url origin >/dev/null 2>&1; then
  echo "Errore: il remote origin esiste gia'; non verra' modificato." >&2
  exit 1
fi

[ -z "$(git status --porcelain)" ] || { echo "Errore: working tree non pulito." >&2; exit 1; }
BRANCH="$(git branch --show-current 2>/dev/null)" || { echo "Errore: impossibile determinare il branch corrente." >&2; exit 1; }
[ "$BRANCH" = "main" ] || { echo "Errore: il branch corrente deve essere main." >&2; exit 1; }

gh auth status >/dev/null 2>&1 || { echo "Errore: gh non risulta autenticato; eseguire 'gh auth login' separatamente." >&2; exit 1; }

printf '%s\n' "ATTENZIONE: verra' creato il repository GitHub PUBBLICO regina-sofia-app e saranno pubblicati i file gia' committati, incluso l'APK se committato."
printf '%s' "Digitare esattamente PUBBLICA per confermare: "
IFS= read -r CONFIRM || { echo "Errore: conferma non letta." >&2; exit 1; }
[ "$CONFIRM" = "PUBBLICA" ] || { echo "Operazione annullata: conferma esplicita non ricevuta." >&2; exit 1; }

if ! gh repo create regina-sofia-app --public --source=. --remote=origin --push; then
  echo "Errore: creazione/push non riusciti. Se il repository esiste gia', non verra' sovrascritto o distrutto." >&2
  exit 1
fi

echo "Repository creato e push completato con successo."
