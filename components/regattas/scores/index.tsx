'use client';

import type { RegattaRegistrationType, RegattaScoresType, RegattaType } from '@/types/entities';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import RegattaScoresEmpty from './RegattaScoresEmpty';
import Button from '@/components/buttons/Button';
import classes from '@/styles/components/regattas/scores/index.module.scss';
import { SelectInputType, TextInputType } from '@/types/inputs';
import TextInput from '@/components/inputs/elements/TextInput';
import SelectInput from '@/components/inputs/elements/SelectInput';
import { renderInitScoreCircumstanceInput, renderInitScoreDateInput, renderInitScorePositionInput, renderInitScoreSailClassesInput } from '@/utils/regatta';
import { API_ENDPOINTS } from '@/configs/server/apiEndpoints';
import SERVER_METHODS from '@/configs/server/methods';
import Spinner from '@/components/loaders/Spinner';
import FormActionMessage from '@/components/forms/FormActionMessage';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/buttons/IconButton';
import EditIcon from '@/components/icons/EditIcon';

interface Props {
  registrations: RegattaRegistrationType[];
  scores: RegattaScoresType;
  regattaId: string;
  regattaSailingClasses: RegattaType['sailingClasses'];
  regattaStartDate: string;
  regattaEndDate: string;
}

const BACKUP_ROW_HEIGHT = 48;

const RegattaScores = ({ registrations, scores, regattaId, regattaSailingClasses, regattaStartDate, regattaEndDate }: Props) => {
  const router = useRouter();
  const registrationsWithRankings = registrations.map((reg, i) => ({
    ...reg,
    positionInput: renderInitScorePositionInput({ sailNum: reg.sailNumber.toString(), initValue: i + 1 }),
    circumstanceInput: renderInitScoreCircumstanceInput({ sailNum: reg.sailNumber.toString() })
  }));
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [addRaceClass, setAddRaceClass] = useState<{ id: number; name: string } | null>(null);
  const [raceToEdit, setRaceToEdit] = useState<{ id: number; raceNum: number; raceDate: string; } | null>(null);

  const [addMode, setAddMode] = useState(false);
  const [items, setItems] = useState([...registrationsWithRankings]);
  const [rowHeight, setRowHeight] = useState(BACKUP_ROW_HEIGHT);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState(0);
  const [isOutside, setIsOutside] = useState(false);

  const [dateInput, setDateInput] = useState<TextInputType>(() => renderInitScoreDateInput({ regattaStartDate, regattaEndDate }));

  const [sailingClassesInput, setSailingClassesInput] = useState<SelectInputType>(() => renderInitScoreSailClassesInput({ regattaSailingClasses }));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  if (firstRowRef.current) {
    const height = firstRowRef.current.getBoundingClientRect().height;
    setRowHeight(height);
  }
}, []);

  const onSetAddMode = (mode: boolean) => setAddMode(mode);

  // START DRAG
  const onMouseDown = (index: number) => (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input, button, textarea, select')) {
      return; // don't start drag
    }
    e.preventDefault();

    setDragIndex(index);
    setHoverIndex(index);
    setMouseY(e.clientY);
    setIsOutside(false);
  };

  // MAIN DRAG EFFECT
  useEffect(() => {
    if (dragIndex === null) return;

    let currentHover = dragIndex;

    const handleMove = (e: MouseEvent) => {
      setMouseY(e.clientY);

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      const outside =
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right;

      setIsOutside(outside);

      if (outside) return;

      const offsetY = e.clientY - rect.top;

      let newIndex = Math.floor(offsetY / rowHeight);
      newIndex = Math.max(0, Math.min(items.length - 1, newIndex));

      currentHover = newIndex;
      setHoverIndex(newIndex);
    };

    const handleUp = () => {
      setItems((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(currentHover, 0, moved);
        return updated.map((reg, i) => ({
          ...reg,
          positionInput: {
            ...reg.positionInput,
            value: (i + 1).toString()
          }
        }));
      });

      setDragIndex(null);
      setHoverIndex(null);
      setIsOutside(false);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [dragIndex, items.length, rowHeight]);

  const onSelectSailingClass = (_: string, value: string) => {
    setSailingClassesInput((prev) => ({ ...prev, value, dropdownOpen: false }));
    setItems(registrationsWithRankings.filter((reg) => reg.sailingClass.name === value));
  };

  const onPositionInputChange = (e: ChangeEvent<HTMLInputElement>, regId: number) => {
    setItems((prev) => prev.map((reg) => {
      if (reg.id !== regId) {
        return reg;
      }

      return {
        ...reg,
        positionInput: {
          ...reg.positionInput,
          value: e.target.value
        },
        circumstanceInput: {
          ...reg.circumstanceInput,
          value: ''
        }
      };
    }));
  };

  const onCircumstanceInputFocus = (_: ChangeEvent<HTMLInputElement>, regId: number) => {
    setItems((prev) => prev.map((reg) => {
      if (reg.id !== regId) {
        return reg;
      }

      return {
        ...reg,
        circumstanceInput: {
          ...reg.circumstanceInput,
          dropdownOpen: true,
          focused: true,
          touched: true
        }
      };
    }));
  };

  const onCircumstanceInputCloseDropdown = (regId: number) => {
    setItems((prev) => prev.map((reg) => {
      if (reg.id !== regId) {
        return reg;
      }

      return {
        ...reg,
        circumstanceInput: {
          ...reg.circumstanceInput,
          dropdownOpen: false,
          focused: false,
          touched: false
        }
      };
    }));
  };

  const onCircumstanceInputChange = (regId: number, value: string) => {
    setItems((prev) => prev.map((reg) => {
      if (reg.id !== regId) {
        return reg;
      }

      return {
        ...reg,
        positionInput: {
          ...reg.positionInput,
          value: ''
        },
        circumstanceInput: {
          ...reg.circumstanceInput,
          dropdownOpen: false,
          value: value
        }
      };
    }));
  };

  const onCircumstanceInputClear = (regId: number) => {
    setItems((prev) => prev.map((reg) => {
      if (reg.id !== regId) {
        return reg;
      }

      return {
        ...reg,
        circumstanceInput: {
          ...reg.circumstanceInput,
          dropdownOpen: false,
          value: ''
        }
      };
    }));
  };

  const onApplyInputChanges = (regId: number) => {
    setItems((prev) => {
      const regTarget = prev.find((reg) => reg.id === regId);
      if (!regTarget) {
        return prev;
      }
      const regTargetIndex = prev.indexOf(regTarget);
      if (regTargetIndex === -1) {
        return prev;
      }
      
      const updated = [...prev];

      if (regTarget.positionInput.value) {
        const newPosition = parseInt(regTarget.positionInput.value) - 1;
        const [moved] = updated.splice(regTargetIndex, 1);
        updated.splice(newPosition, 0, moved);
        return updated.map((reg, i) => ({
          ...reg,
          positionInput: {
            ...reg.positionInput,
            value: (i + 1).toString()
          }
        }));
      }
      
      if (regTarget.circumstanceInput.value) {
        const newPosition = updated.length - 1;
        const [moved] = updated.splice(regTargetIndex, 1);
        updated.splice(newPosition, 0, moved);
        return updated.map((reg, i) => ({
          ...reg,
          positionInput: {
            ...reg.positionInput,
            value: (i + 1).toString()
          }
        }))
      }

      return prev;
    });
  };

  const onSaveScore = async () => {
    if (!items || items.length === 0) {
      return;
    }

    try {
      setSaveLoading(true);
      const reqBodyItems = items.map((i) => {
        return {
          registrationId: i.id,
          ...(i.circumstanceInput.value ? {
            circumstance: i.circumstanceInput.value.trim()
          } : {
            position: i.positionInput.value.trim()
          })
        };
      });

      const classId = addRaceClass?.id || regattaSailingClasses.find((sc) => sc.name.trim() === sailingClassesInput.value.trim())?.id

      const reqBody = {
        sailingClassId: classId,
        raceDate: dateInput.value,
        raceNumber: scores.classes.find((cl) => cl.sailingClassId === classId!)!.races.length + 1,
        results: reqBodyItems
      };
      const response = await fetch(`${API_ENDPOINTS.REGATTAS.create}/${regattaId}/races`, {
        method: SERVER_METHODS.POST,
        body: JSON.stringify(reqBody)
      });
      if (!response.ok) {
        setSaveError('Failed to create Race');
      }
      router.refresh();
      setAddRaceClass(null);
      setAddMode(false);
    } catch {
      setSaveError('Failed to create Race');
    } finally {
      setSaveLoading(false);
    }
  };

  const onUpdateRace = async () => {
    if (!addRaceClass || !raceToEdit) {
      return;
    }

    try {
      setSaveLoading(true);

      if (!addRaceClass?.id || !raceToEdit?.id) {
        return setSaveError('Failed to update Race');
      }

      const reqBodyItems = items.map((i) => {
        return {
          registrationId: i.id,
          ...(i.circumstanceInput.value ? {
            circumstance: i.circumstanceInput.value.trim()
          } : {
            position: +i.positionInput.value.trim()
          })
        };
      });

      const response = await fetch(`${API_ENDPOINTS.REGATTAS.create}/${regattaId}/races/${raceToEdit.id}`, {
        method: SERVER_METHODS.PUT,
        body: JSON.stringify({
          sailingClassId: addRaceClass.id,
          raceNumber: raceToEdit.raceNum,
          raceDate: raceToEdit.raceDate,
          results: reqBodyItems
        })
      });

      if (!response.ok) {
        setSaveError('Failed to UPDATE Race');
      }
      router.refresh();
      setAddRaceClass(null);
      setAddMode(false);
      setRaceToEdit(null);
    } catch {
      setSaveError('Failed to update Race');
    } finally {
      setSaveLoading(false);
    }
  };

  const saveDisabled = items
    .some(
      (it, i, arr) => !it.circumstanceInput.value.trim() && !it.positionInput.value.trim()
      || arr.some((itm, ind) => ind !== i && ind > i && it.circumstanceInput.value && !itm.circumstanceInput.value.trim())
    );

  // cursor feedback
  useEffect(() => {
    if (dragIndex !== null) {
      document.body.style.cursor = isOutside ? 'not-allowed' : 'grabbing';
    } else {
      document.body.style.cursor = '';
    }
  }, [dragIndex, isOutside]);

  if (saveLoading) {
    return <Spinner />;
  }

  if (saveError) {
    return <FormActionMessage isError message='err' />;
  }

  if (scores.classes.some((cl) => cl.standings.length > 0)) {
    if (addRaceClass) {
      return (
        <div className={classes.scores}>
          <div className={classes.scoresCancel}>
            <Button
              text="cancel"
              type="button"
              danger
              hasBorder={false}
              display="inlineBlock"
              onClick={() => {
                onSetAddMode(false)
                setAddRaceClass(null);
                setRaceToEdit(null);
              }}
            />
          </div>

          <div className={classes.scoresForm}>
            <div>
              <TextInput
                data={dateInput}
                onFocus={() => setDateInput((prev) => ({ ...prev, focused: true, touched: true }))}
                onUnfocus={() => setDateInput((prev) => ({ ...prev, focused: false }))}
                onChange={(e) => setDateInput((prev) => ({ ...prev, value: e.target.value }))}
                onClear={() => setDateInput((prev) => ({ ...prev, value: '' }))}
              />
              <div>Setting results for {addRaceClass.name} class {raceToEdit ? ' for race ' + raceToEdit.raceNum : ''}</div>
            </div>
          </div>
          {!dateInput.value && !raceToEdit ? (
            <p className={classes.scoresFormText}>Select Date for which you want to add results</p>
          ) : (
            <>
              <div className={classes.scoresSave}>
                <Button
                  type="button"
                  text="Save"
                  display="inlineBlock"
                  disabled={saveDisabled}
                  onClick={raceToEdit ? onUpdateRace : onSaveScore}
                />
              </div>
              <div className={classes.scoresTable}>
                <div className={classes.scoresHeader}>
                  <div className={classes.scoresHeaderEmpty} />
                  <div className={classes.scoresHeaderGroup}>
                    <div className={classes.scoresHeaderItem}>sail num</div>
                    <div className={`${classes.scoresHeaderItem} ${classes.showOnFirstHigherBreak}`}>name</div>
                    <div className={`${classes.scoresHeaderItem} ${classes.showOnFirstHigherBreak}`}>class</div>
                    <div className={classes.scoresHeaderItemInputs} />
                  </div>
                </div>

                <div
                  ref={containerRef}
                  className={`${classes.scoresBody} ${isOutside ? classes.outside : ''}`}
                >
                  {items.map((reg, i) => {
                    const isDragging = i === dragIndex;

                    let transform = '';
                    if (dragIndex !== null && hoverIndex !== null && i !== dragIndex) {
                      if (i >= hoverIndex && i < dragIndex) {
                        transform = `translateY(${rowHeight}px)`;
                      } else if (i <= hoverIndex && i > dragIndex) {
                        transform = `translateY(-${rowHeight}px)`;
                      }
                    }

                    return (
                      <div
                        key={reg.id}
                        ref={i === 0 ? firstRowRef : null}
                        className={classes.scoresRow}
                        onMouseDown={onMouseDown(i)}
                        style={{
                          transform,
                          opacity: isDragging ? 0 : 1,
                          transition: 'transform 0.15s ease',
                          cursor: dragIndex !== null ? 'grabbing' : 'grab'
                        }}
                      >
                        <div className={`${classes.scoresRowEmpty} ${dragIndex !== null ? classes.scoresRowEmptyInvisible : ''}`}>{i + 1}</div>

                        <div className={classes.scoresRowGroup}>
                          <div className={classes.scoresRowItem}>{reg.sailNumber}</div>
                          <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{reg.sailorName}</div>
                          <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{reg.sailingClass.name}</div>
                          <div className={classes.scoresRowInputs}>
                            <TextInput
                              data={reg.positionInput}
                              noMargins
                              onFocus={() => {}}
                              onUnfocus={() => {}}
                              onChange={(e) => onPositionInputChange(e, reg.id)}
                            />
                            <SelectInput
                              data={reg.circumstanceInput}
                              noMargins
                              onFocus={(e) => onCircumstanceInputFocus(e, reg.id)}
                              onUnfocus={() => {}}
                              onClear={() => onCircumstanceInputClear(reg.id)}
                              onCloseDropdown={() => onCircumstanceInputCloseDropdown(reg.id)}
                              onSelect={(_, value) => onCircumstanceInputChange(reg.id, value)}
                            />
                            <Button
                              type="button"
                              text="Apply"
                              display="inlineBlock"
                              onClick={() => onApplyInputChanges(reg.id)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DRAG GHOST */}
              {dragIndex !== null && hoverIndex !== null && (
                <div
                  className={classes.dragOverlay}
                  style={{
                    top: mouseY,
                    opacity: isOutside ? 0.4 : 1,
                    width: containerRef.current?.clientWidth || '90%'
                  }}
                >
                  <div className={classes.scoresRow}>
                    <div className={classes.scoresRowEmpty}>
                      {hoverIndex + 1}
                    </div>

                    <div className={classes.scoresRowGroup}>
                      <div className={classes.scoresRowItem}>{items[dragIndex].sailNumber}</div>
                      <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{items[dragIndex].sailorName}</div>
                      <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{items[dragIndex].sailingClass.name}</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
    return (
      <div className={classes.scoresList}>
        {scores.classes.map((cl) => {
          return (
            <div key={cl.sailingClassId} className={classes.scoresListClass}>
              <div className={classes.scoresListClassName}>Sailng Class: {cl.sailingClassName}</div>
              {
                cl.standings.length === 0
                  ? <div className={classes.addRace}>
                    <p>No Results for this class</p>
                    {registrations.filter((r) => r.sailingClass.id === cl.sailingClassId).length > 0 ? (
                      <Button
                        text="Add races"
                        type="button"
                        display="inlineBlock"
                        hasBorder
                        onClick={() => {
                          setAddRaceClass({ id: cl.sailingClassId, name: cl.sailingClassName });
                          setItems(
                            registrationsWithRankings
                              .filter((reg) => {
                                return reg.sailingClass.id === cl.sailingClassId
                              })
                              .map((reg, i) => ({
                                ...reg,
                                positionInput: {
                                  ...reg.positionInput,
                                  value: (i + 1).toString()
                                }
                              }))
                          );
                        }}
                      />
                    ) : (
                      <p>No registrations for this class</p>
                    )}
                  </div>
                  : (
                    <div>
                      <div>
                        <Button
                          type="button"
                          text="Add Race"
                          display="inlineBlock"
                          hasBorder
                          onClick={() => {
                            setAddRaceClass({ id: cl.sailingClassId, name: cl.sailingClassName });
                        
                            setItems(
                              registrationsWithRankings
                                .filter((reg) => {
                                  return reg.sailingClass.id === cl.sailingClassId;
                                })
                                .map((reg, i) => ({
                                  ...reg,
                                  positionInput: {
                                    ...reg.positionInput,
                                    value: (i + 1).toString()
                                  }
                                }))
                            );
                          }}
                        />
                      </div>
                      <div className={classes.scoresListTable}>
                        <div className={classes.scoresListTableHeader}>
                          <div className={classes.scoresListTableHeaderItem}>Sail Num</div>
                          {cl.races.map((r) => (
                            <div
                              className={`${classes.scoresListTableHeaderItem} ${classes.scoresListTableHeaderItemEditable}`}
                              key={r.raceId}>
                                <span>R - {r.raceNumber}</span>
                                <IconButton
                                  Icon={<EditIcon />}
                                  text=''
                                  onClick={() => {
                                    setAddMode(true);
                                    setAddRaceClass({ id: cl.sailingClassId, name: cl.sailingClassName });
                                    setRaceToEdit({ id: r.raceId, raceNum: r.raceNumber, raceDate: r.raceDate });
                                    setDateInput((prev) => ({ ...prev, value: r.raceDate }));
                                    const raceId = r.raceId;

                                    // map registrationId -> race result
                                    const raceResultsMap = new Map(
                                      cl.standings.map((stand) => {
                                        const result = stand.raceResults.find(rr => rr.raceId.toString() === raceId.toString());

                                        return [
                                          stand.registrationId,
                                          result?.position ?? Number.MAX_SAFE_INTEGER // fallback for DNF etc
                                        ];
                                      })
                                    );
                                    setItems(
                                      registrationsWithRankings
                                        .filter((reg) => reg.sailingClass.id === cl.sailingClassId)
                                        .sort((a, b) => {
                                          const posA = raceResultsMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
                                          const posB = raceResultsMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;

                                          return posA - posB;
                                        })
                                        .map((reg, i) => {
                                          const raceTarg = cl.standings.find((st) => st.registrationId === reg.id);
                                          const raceRanks = raceTarg?.raceResults;
                                          const targR = raceRanks?.find((rac) => rac.raceId.toString() === raceId.toString());

                                          return {
                                            ...reg,
                                            positionInput: {
                                              ...reg.positionInput,
                                              value: (i + 1).toString()
                                            },
                                            circumstanceInput: {
                                              ...reg.circumstanceInput,
                                              value: targR?.circumstance || reg.circumstanceInput.value
                                            }
                                          }
                                        })
                                    );
                                  }}
                                />
                              </div>
                          ))}
                          <div className={classes.scoresListTableHeaderItem}>Total</div>
                        </div>
                        {
                          cl.standings.map((stand) => {
                            return (
                              <div className={classes.scoreStandings} key={`${stand.registrationId}-${stand.sailNumber}`}>
                                <div className={classes.scoreStandingsItem}>{stand.nationCode} - {stand.sailNumber}</div>
                                {stand.raceResults.map((rr) => (
                                  <div className={classes.scoreStandingsItem} key={`${rr.raceId}-${stand.sailNumber}`}>
                                    {rr.position || rr.circumstance} {rr.excluded ? <span className={classes.excluded}>EXC</span> : ''}
                                  </div>
                                ))}
                                <div className={classes.scoreStandingsItem}>{stand.totalPoints}</div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  )
              }
            </div>
          );
        })}
      </div>
    )
  }

  if (!addMode) {
    return <RegattaScoresEmpty onSetAddMode={onSetAddMode} />;
  }

  return (
    <div className={classes.scores}>
      <div className={classes.scoresCancel}>
        <Button
          text="cancel"
          type="button"
          danger
          hasBorder={false}
          display="inlineBlock"
          onClick={() => {
            onSetAddMode(false)
            setRaceToEdit(null);
          }}
        />
      </div>

      <div className={classes.scoresForm}>
        <div>
          <TextInput
            data={dateInput}
            onFocus={() => setDateInput((prev) => ({ ...prev, focused: true, touched: true }))}
            onUnfocus={() => setDateInput((prev) => ({ ...prev, focused: false }))}
            onChange={(e) => setDateInput((prev) => ({ ...prev, value: e.target.value }))}
            onClear={() => setDateInput((prev) => ({ ...prev, value: '' }))}
          />
          <SelectInput
            data={sailingClassesInput}
            onFocus={() => setSailingClassesInput((prev) => ({ ...prev, focused: true, touched: true, dropdownOpen: true }))}
            onUnfocus={() => setSailingClassesInput((prev) => ({ ...prev, focused: false }))}
            onClear={() => setSailingClassesInput((prev) => ({ ...prev, value: '' }))}
            onCloseDropdown={() => setSailingClassesInput((prev) => ({ ...prev, dropdownOpen: false }))}
            onSelect={onSelectSailingClass}
          />
        </div>
      </div>
      {!dateInput.value || !sailingClassesInput.value ? (
        <p className={classes.scoresFormText}>Select Date and Sailing Class for which you want to add results</p>
      ) : (
        <>
          <div className={classes.scoresSave}>
            <Button
              type="button"
              text="Save"
              display="inlineBlock"
              disabled={saveDisabled}
              onClick={onSaveScore}
            />
          </div>
          <div className={classes.scoresTable}>
            <div className={classes.scoresHeader}>
              <div className={classes.scoresHeaderEmpty} />
              <div className={classes.scoresHeaderGroup}>
                <div className={classes.scoresHeaderItem}>sail num</div>
                <div className={`${classes.scoresHeaderItem} ${classes.showOnFirstHigherBreak}`}>name</div>
                <div className={`${classes.scoresHeaderItem} ${classes.showOnFirstHigherBreak}`}>class</div>
                <div className={classes.scoresHeaderItemInputs} />
              </div>
            </div>

            <div
              ref={containerRef}
              className={`${classes.scoresBody} ${isOutside ? classes.outside : ''}`}
            >
              {items.map((reg, i) => {
                const isDragging = i === dragIndex;

                let transform = '';
                if (dragIndex !== null && hoverIndex !== null && i !== dragIndex) {
                  if (i >= hoverIndex && i < dragIndex) {
                    transform = `translateY(${rowHeight}px)`;
                  } else if (i <= hoverIndex && i > dragIndex) {
                    transform = `translateY(-${rowHeight}px)`;
                  }
                }

                return (
                  <div
                    key={reg.id}
                    ref={i === 0 ? firstRowRef : null}
                    className={classes.scoresRow}
                    onMouseDown={onMouseDown(i)}
                    style={{
                      transform,
                      opacity: isDragging ? 0 : 1,
                      transition: 'transform 0.15s ease',
                      cursor: dragIndex !== null ? 'grabbing' : 'grab'
                    }}
                  >
                    <div className={`${classes.scoresRowEmpty} ${dragIndex !== null ? classes.scoresRowEmptyInvisible : ''}`}>{i + 1}</div>

                    <div className={classes.scoresRowGroup}>
                      <div className={classes.scoresRowItem}>{reg.sailNumber}</div>
                      <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{reg.sailorName}</div>
                      <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{reg.sailingClass.name}</div>
                      <div className={classes.scoresRowInputs}>
                        <TextInput
                          data={reg.positionInput}
                          noMargins
                          onFocus={() => {}}
                          onUnfocus={() => {}}
                          onChange={(e) => onPositionInputChange(e, reg.id)}
                        />
                        <SelectInput
                          data={reg.circumstanceInput}
                          noMargins
                          onFocus={(e) => onCircumstanceInputFocus(e, reg.id)}
                          onUnfocus={() => {}}
                          onClear={() => onCircumstanceInputClear(reg.id)}
                          onCloseDropdown={() => onCircumstanceInputCloseDropdown(reg.id)}
                          onSelect={(_, value) => onCircumstanceInputChange(reg.id, value)}
                        />
                        <Button
                          type="button"
                          text="Apply"
                          display="inlineBlock"
                          onClick={() => onApplyInputChanges(reg.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DRAG GHOST */}
          {dragIndex !== null && hoverIndex !== null && (
            <div
              className={classes.dragOverlay}
              style={{
                top: mouseY,
                opacity: isOutside ? 0.4 : 1,
                width: containerRef.current?.clientWidth || '90%'
              }}
            >
              <div className={classes.scoresRow}>
                <div className={classes.scoresRowEmpty}>
                  {hoverIndex + 1}
                </div>

                <div className={classes.scoresRowGroup}>
                  <div className={classes.scoresRowItem}>{items[dragIndex].sailNumber}</div>
                  <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{items[dragIndex].sailorName}</div>
                  <div className={`${classes.scoresRowItem} ${classes.showOnFirstHigherBreak}`}>{items[dragIndex].sailingClass.name}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RegattaScores;