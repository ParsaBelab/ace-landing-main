/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import { useEffect, useState } from 'react';
import { PP_MORI } from '@assets/fonts';
import RecentWorkCard from '@components/RecentWorks/RecentWorkCard';
import type { RecentWorkCardProps } from '@components/RecentWorks/RecentWorkCard';
import Logo from '@design/Logo/Logo';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { membersData } from '@libs/data/members';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React from 'react';
import { supabase } from '@/libs/supabase';

const RecentWorksPage = () => {
  const t = useTranslations('recentWorks');
  const [works, setWorks] = useState<RecentWorkCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('works')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setWorks(data.map(w => ({
            multiple: w.multiple,
            bg: w.bg,
            data: {
              title: w.title,
              client: w.client,
              date: w.date,
              tools: w.tools,
              images: w.images,
              designers: membersData.filter(m => w.designers.includes(m.id)),
            },
          })));
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-[180px] flex flex-col items-center gap-[18px]
                    pb-[95px] md:mt-[218px]">
      <Logo />
      <MotionDiv className="flex flex-col items-center text-center text-[29px]
                           font-medium !leading-[38px] sm:text-[33px]">
        <h3>{t('title')}</h3>
      </MotionDiv>
      <MotionDiv className={cn(
        'max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40 sm:max-w-[494px]',
        PP_MORI.className,
      )}>
        {t('description')}
      </MotionDiv>
      <div className="flex w-full max-w-[95%] flex-col gap-4
                      md:gap-[45px] lg:max-w-[947px]">
        {loading ? (
          <p style={{ textAlign: 'center', opacity: 0.4, padding: '40px' }}>
            Loading...
          </p>
        ) : (
          works.map((data, index) => (
            <RecentWorkCard key={`Recent_Works_Card${index}`} {...data} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentWorksPage;
