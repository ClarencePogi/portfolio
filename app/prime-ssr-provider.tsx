'use client';
import { PrimeReactProvider, PrimeReactStyleSheet } from '@primereact/core';
import { useServerInsertedHTML } from 'next/navigation';
import * as React from 'react';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const styledStyleSheet = new PrimeReactStyleSheet();

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
        },
      },

      dark: {
        surface: {
          0: "#0f172a",
          50: "#111827",
          100: "#1e293b",
        },
      },
    },
  },
});

export default function PrimeSSRProvider({ children }: Readonly<{children?: React.ReactNode;}>) {
    useServerInsertedHTML(() => {
        const styleElements = styledStyleSheet.getAllElements();

        styledStyleSheet.clear();

        return <>{styleElements}</>;
    });

    const primereact = {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: ".app-dark"
            }
        },
        license: 'eyJpZCI6ImFjODJhN2FjLWI3ZmUtNDZlNy1hMTZlLTNjNzc0YWIyZGM3MyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODUzMzQ3MTUsImV4cCI6MTgxNjg3MDcxNX0.ujw7EOVfIL3UzONyekMlj70EzNmu3titciEPc8t8ymbs9P7diSinbN3i-YVSklufS4ZWKJDA141AT5b3NlO0DA'
    };

    return (
        <PrimeReactProvider {...primereact} stylesheet={styledStyleSheet}>
            {children}
        </PrimeReactProvider>
    );
}
